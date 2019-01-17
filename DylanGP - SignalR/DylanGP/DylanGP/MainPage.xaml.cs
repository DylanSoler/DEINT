using DylanGP.Models;
using Microsoft.AspNet.SignalR.Client;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Runtime.InteropServices.WindowsRuntime;
using System.Threading;
using Windows.Foundation;
using Windows.Foundation.Collections;
using Windows.UI.Core;
using Windows.UI.Popups;
using Windows.UI.Xaml;
using Windows.UI.Xaml.Controls;
using Windows.UI.Xaml.Controls.Primitives;
using Windows.UI.Xaml.Data;
using Windows.UI.Xaml.Input;
using Windows.UI.Xaml.Media;
using Windows.UI.Xaml.Media.Imaging;
using Windows.UI.Xaml.Navigation;

// La plantilla de elemento Página en blanco está documentada en https://go.microsoft.com/fwlink/?LinkId=402352&clcid=0xc0a

namespace DylanGP
{
    /// <summary>
    /// Página vacía que se puede usar de forma independiente o a la que se puede navegar dentro de un objeto Frame.
    /// </summary>
    public sealed partial class MainPage : Page
    {

        //Propiedades
        private int numJug;
        private clsCoche coche = new clsCoche();
        private List<clsCoche> coches = new List<clsCoche>();

        /// <summary>
        /// Recogemos el parametro, para actualizar el nick de nuestro coche
        /// </summary>
        /// <param name="e"></param>
        protected override void OnNavigatedTo(NavigationEventArgs e)
        {
            coche.nick = (String)e.Parameter;
        }

        public HubConnection conn { get; set; }
        public IHubProxy proxy { get; set; }

        public MainPage()
        {
            this.InitializeComponent();
            SignalR();
            //añadimos nuestro coche al array total de coches
            coches.Add(coche);
            cargando();
            proxy.Invoke("actualizarJugadores");
            
        }

        /// <summary>
        /// Método que duerme el hilo 5 segundos para que de tiempo a 
        /// establecer la conexion con el servidor
        /// </summary>
        private void cargando()
        {
            for (int i = 0; i < 7; i++){
                Thread.Sleep(1000);}
        }

        public void SignalR()
        {
            conn = new HubConnection("http://dylangp.azurewebsites.net/");

            proxy = conn.CreateHubProxy("CarrerasHub");
            conn.Start();

            proxy.On("actualizarNumJugadores", actNumJugadores);
            proxy.On("enviarCoche",enviarMiCoche);
            proxy.On<clsCoche>("addCoches", actualizarListCoches);
            proxy.On<List<clsCoche>>("pintarListado", pintarCoches);
            proxy.On<String>("mostrarGanador",dialogGanador);
            proxy.On<List<clsCoche>>("reiniciarPartida", restart);
            proxy.On("salirJuego",salir);
            proxy.On<int>("notificacionNumJug", notificarNumJug);

        }

        /// <summary>
        /// Cuando el numero de jugadores es el necesario se notifica a los clientes conectados posteriormente
        /// </summary>
        /// <param name="num"></param>
        private void notificarNumJug(int num)
        {
            numJug = num;
        }

        /// <summary>
        /// Metodo que te envia a la pantalla de inicio
        /// </summary>
        private async void salir()
        {
            await Windows.ApplicationModel.Core.CoreApplication.MainView.CoreWindow.Dispatcher.RunAsync(CoreDispatcherPriority.Normal,
            () =>
            {
                coche = new clsCoche();
                coches = new List<clsCoche>();
                numJug = 0;

                this.Frame.Navigate(typeof(nick));
            }
            );
        }

        /// <summary>
        /// Modifica la propiedad posLeft del coche e invoca a avanzarPartida
        /// </summary>
        /// <param name="listadoCoches"></param>
        private void restart(List<clsCoche> listadoCoches)
        {
            coche.posLeft = 0;
            foreach (clsCoche c in listadoCoches) {
                c.posLeft = 0;
            }
            proxy.Invoke("avanzarPartida",listadoCoches);
        }

        private async void dialogGanador(string nick)
        {
            await Windows.ApplicationModel.Core.CoreApplication.MainView.CoreWindow.Dispatcher.RunAsync(CoreDispatcherPriority.Normal,
            () =>
            {
                contDialogGan(nick);
            }
            );
        }

        /// <summary>
        /// Muestra un dialogo con el nick del ganador e invoca
        /// a reiniciar partida o a salir
        /// </summary>
        /// <param name="nick"></param>
        private async void contDialogGan(String nick)
        {
            ContentDialog gan = new ContentDialog();
            gan.Title = "DylanGP";
            gan.Content = "Ha ganado: " + nick;
            gan.PrimaryButtonText = "Reiniciar";
            gan.SecondaryButtonText = "Salir";

            ContentDialogResult resultado = await gan.ShowAsync();

            if (resultado == ContentDialogResult.Primary)
            {
                proxy.Invoke("reiniciar", coches);
            }
            else
            {
                proxy.Invoke("salir");
            }
        }

        /// <summary>
        /// Metodo que invoca aniadirMiCoche en el servidor, enviando el coche
        /// </summary>
        private async void enviarMiCoche()
        {
            await Windows.ApplicationModel.Core.CoreApplication.MainView.CoreWindow.Dispatcher.RunAsync(CoreDispatcherPriority.Normal,
            () =>
            {
                proxy.Invoke("aniadirMiCoche", coche);
            }
            );
        }

        /// <summary>
        /// Pinta el array de coches completo en el canvas
        /// </summary>
        /// <param name="listCoches"></param>
        private async void pintarCoches(List<clsCoche> listCoches)
        {
            await Windows.ApplicationModel.Core.CoreApplication.MainView.CoreWindow.Dispatcher.RunAsync(CoreDispatcherPriority.Normal,
            () =>
            {
                carretera.Children.Clear();

                //listCoches.Sort();
                listCoches = listCoches.OrderBy(x => x.nick).ToList();

                foreach (clsCoche car in listCoches)
                {
                    int cont = 1;

                    Image img = new Image();
                    String imagen = cargarImagen(cont);
                    img.Source = new BitmapImage(new Uri("ms-appx:///" + imagen));
                    img.Name = car.nick;
                    img.Width = 80;
                    img.Height = 100;

                    double top = 100*cont;
                    Canvas.SetTop(img, top);
                    Canvas.SetLeft(img, car.posLeft);

                    carretera.Children.Add(img);

                    cont++;
                }
            }
            );
        }

        /// <summary>
        /// Devuelve el string correspondiente a una imagen segun el numero enviado
        /// </summary>
        /// <param name="cont"></param>
        /// <returns></returns>
        private string cargarImagen(int cont)
        {
            String i = " "; ;

            switch (cont)
            {
                case 1: i = "Assets/red.png";
                    break;
                case 2: i = "Assets/blue.png";
                    break;
                case 3: i = "Assets/green.png";
                    break;
                case 4: i = "Assets/yellow.png";
                    break;
            }
            return i;
        }

        /// <summary>
        /// Añade un coche al List de coches
        /// </summary>
        /// <param name="obj"></param>
        private async void actualizarListCoches(clsCoche car)
        {
            await Windows.ApplicationModel.Core.CoreApplication.MainView.CoreWindow.Dispatcher.RunAsync(CoreDispatcherPriority.Normal,
            () =>
            {
                coches.Add(car);
            }
            );
        }

        /// <summary>
        /// Actuliza el numero de jugadores y cuando llega a 4, inicia la partida
        /// </summary>
        private async void actNumJugadores()
        {
            await Windows.ApplicationModel.Core.CoreApplication.MainView.CoreWindow.Dispatcher.RunAsync(CoreDispatcherPriority.Normal,
            () =>
            {
                numJug++;
                if (numJug == 1)
                {
                    proxy.Invoke("notificarJugadores", numJug);
                    proxy.Invoke("actualizarCoches");
                    proxy.Invoke("avanzarPartida", coches);
                    speedUp.IsEnabled = true;
                    speedUp.Content = "SPEED UP";
                }
                else
                {
                    speedUp.IsEnabled = false;
                    speedUp.Content = "Espere";
                }
            }
            );
        }

        /// <summary>
        /// Evento asociado al click del boton speedup, invoca a avanzar
        /// partida en el servidor, enviandole el List actualizado
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        private void Button_Click(object sender, RoutedEventArgs e)
        {           
            bool salir = false;

            coche.posLeft += 100;

            for (int i = 0; i < coches.Count() && salir == false; i++)
            {
                clsCoche c = coches[i];
                if (coche.nick == c.nick)
                {
                    c.posLeft += 100;
                    salir = true;
                }
            }

            if (conn.State == Microsoft.AspNet.SignalR.Client.ConnectionState.Connected){
                proxy.Invoke("avanzarPartida", coches);}

            if (coche.posLeft >= carretera.Width) {
                proxy.Invoke("ganador", coche);}

        }

    }
}
