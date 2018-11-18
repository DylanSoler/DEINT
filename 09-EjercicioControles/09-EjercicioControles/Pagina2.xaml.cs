using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Runtime.InteropServices.WindowsRuntime;
using Windows.Devices.Geolocation;
using Windows.Foundation;
using Windows.Foundation.Collections;
using Windows.UI.Input.Inking;
using Windows.UI.Xaml;
using Windows.UI.Xaml.Controls;
using Windows.UI.Xaml.Controls.Maps;
using Windows.UI.Xaml.Controls.Primitives;
using Windows.UI.Xaml.Data;
using Windows.UI.Xaml.Input;
using Windows.UI.Xaml.Media;
using Windows.UI.Xaml.Navigation;

// La plantilla de elemento Página en blanco está documentada en https://go.microsoft.com/fwlink/?LinkId=234238

namespace _09_EjercicioControles
{
    /// <summary>
    /// Una página vacía que se puede usar de forma independiente o a la que se puede navegar dentro de un objeto Frame.
    /// </summary>
    public sealed partial class Pagina2 : Page
    {
        public Pagina2()
        {
            this.InitializeComponent();

            // Establece el raton como dispositivo de entrada del InkCanvas
            inkC.InkPresenter.InputDeviceTypes = Windows.UI.Core.CoreInputDeviceTypes.Mouse;

            //Establecemos posicion central del mapa (IES Nervion)
            BasicGeoposition posicion = new BasicGeoposition() { Latitude = 37.374079, Longitude = -5.969341 };
            Geopoint posicionCentro = new Geopoint(posicion);
            MapControl1.Center = posicionCentro;

        }

        /// <summary>
        /// Metodo asociado al click de btnAtras, enlaza con la MainPage
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        private void btnAtras_Click(object sender, RoutedEventArgs e)
        {
            this.Frame.Navigate(typeof(MainPage));
        }


    }
}
