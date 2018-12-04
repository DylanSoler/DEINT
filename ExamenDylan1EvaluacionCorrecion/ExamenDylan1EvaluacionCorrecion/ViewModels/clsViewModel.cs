using ExamenDylan1EvaluacionCorrecion.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Windows.UI.Xaml.Controls;

namespace ExamenDylan1EvaluacionCorrecion.ViewModels
{
    /// <summary>
    /// Clase ViewModel del MainPage
    /// </summary>
    public class clsViewModel : clsVMBase
    {

        #region Propiedades privadas
        private List<clsCasilla> _listadoCasilla;
        private clsCasilla _casillaPulsada;
        private int _contPulsadasBuenas;
        private DelegateCommand _reiniciarCommand;
        #endregion

        #region Propiedades publicas
        public List<clsCasilla> listadoCasilla
        {

            get { return _listadoCasilla; }

            set { _listadoCasilla = value;}

        }
        public clsCasilla casillaPulsada
        {

            get { return _casillaPulsada; }

            set { _casillaPulsada = value;

                    if (_casillaPulsada != null)
                    {
                        comprobarCasilla(_casillaPulsada);
                    }
                }

        }

        public DelegateCommand reiniciarCommand
        {
            get
            {
                _reiniciarCommand = new DelegateCommand(reiniciarCommand_Executed);
                return _reiniciarCommand;
            }
        }
        #endregion

        #region Contructor
        public clsViewModel()
        {
            _listadoCasilla = rellenarTablero();
        }
        #endregion

        #region Metodos
        /// <summary>
        /// Metodo que devuelve un listado de 16 casillas, 4 de ellas son bomba
        /// y las baraja con el resto.
        /// </summary>
        /// <returns>List de clsCasilla</returns>
        private List<clsCasilla> rellenarTablero()
        {
            //Creamos listado
            List<clsCasilla> lista = new List<clsCasilla>();
            clsCasilla casilla;

            //añadimos 12 casillas sin bomba
            for (int i=1; i<=12; i++) {
                casilla = new clsCasilla(false);
                lista.Add(casilla);
            }

            //añadimos 4 casillas con bomba
            for (int i=1; i<=4; i++) {
                casilla = new clsCasilla(true);
                lista.Add(casilla);
            }

            //Desordenamos usando el algoritmo de Fisher-Yates, y devolvemos la lista barajada
            Random random = new Random();
            clsCasilla auxiliar;

            for (int k = lista.Count-1; k >= 1; k--)
            {
                int r = random.Next(0, k);

                auxiliar = lista[r];
                lista[r] = lista[k];
                lista[k] = auxiliar;
            }

            return lista;
        }

        /// <summary>
        /// Metodo que comprueba si la casilla es bomba o no, cambia la imagen en funcion de ello
        /// y reinicia la partida en caso de haber perdido o ganado
        /// </summary>
        /// <param name="cas">clsCasilla cas, que es la casilla pulsada</param>
        private async void comprobarCasilla(clsCasilla cas)
        {
            if (cas.esBomba)
            {
                _casillaPulsada.rutaImagen = "/Assets/Imagenes/bomba.png";
                NotifyPropertyChanged("casillaPulsada");

                ContentDialog perdiste = new ContentDialog();
                perdiste.Title = "DERROTA";
                perdiste.Content = "Has perdido! Eliminado ;(";
                perdiste.PrimaryButtonText = "Aceptar";

                ContentDialogResult res = await perdiste.ShowAsync();

                if (res == ContentDialogResult.Primary)
                {
                    reiniciarCommand_Executed();
                }
            }
            else
            {
                _casillaPulsada.rutaImagen = "/Assets/Imagenes/salvado.png";
                NotifyPropertyChanged("casillaPulsada");

                _contPulsadasBuenas++;

                if (_contPulsadasBuenas == 5)
                {
                    ContentDialog ganaste = new ContentDialog();
                    ganaste.Title = "VICTORIA";
                    ganaste.Content = "Has ganado! Felicidades :D";
                    ganaste.PrimaryButtonText = "Aceptar";

                    ContentDialogResult res = await ganaste.ShowAsync();

                    if (res == ContentDialogResult.Primary)
                    {
                        reiniciarCommand_Executed();
                    }
                }
            }
        }


        /// <summary>
        /// Metodo asocicado al Command reiniciar, que reinicia la partida
        /// </summary>
        private void reiniciarCommand_Executed()
        {
            _listadoCasilla = rellenarTablero();
            NotifyPropertyChanged("listadoCasilla");
            _casillaPulsada = null;
            NotifyPropertyChanged("casillaPulsada");
            _contPulsadasBuenas = 0;
        }

        #endregion

    }
}
