using _14_CRUDPersonasUWP_UI.ViewModels;
using ExamenDylan1EvaluacionDEINT.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ExamenDylan1EvaluacionDEINT.ViewModels
{
    public class ViewModel : clsVMBase 
    {

        #region Propiedades privadas

        private List<clsImagen> _imagenes;
        private clsImagen _imagenPulsada;
        private int _numAleatorio1;
        private int _numAleatorio2;
        private int _numAleatorio3;
        private int _numAleatorio4;
        private int _numCartasSinBomba;
        private String _finPartida;
        private DelegateCommand _actualizarCommand;

        #endregion

        #region Propiedades publicas

        public List<clsImagen> imagenes
        {

            get { return _imagenes; }

            set { _imagenes = value; }

        }

        public clsImagen imagenPulsada
        {

            get { return _imagenPulsada; }

            set { _imagenPulsada = value;
                if (_imagenPulsada != null)
                {
                    if (comprobarBomba())
                    {
                        _imagenes[_imagenPulsada.numero].ruta = "/Assets/Imagenes/bomba.png";
                        NotifyPropertyChanged("imagenes");
                        _finPartida = "Lo sentimos mucho, has perdido";
                        NotifyPropertyChanged("finPartida");
                        //reiniciarPartida();
                    }
                    else
                    {
                        _imagenes[_imagenPulsada.numero].ruta = "/Assets/Imagenes/salvado.png";
                        NotifyPropertyChanged("imagenes");
                        _numCartasSinBomba++;
                        if (_numCartasSinBomba == 5 && _finPartida == null)
                        {
                            _finPartida = "Enhorabuena, ¡has ganado!";
                            NotifyPropertyChanged("finPartida");
                        }
                    }
                }//fin de if
            }//fin set

        }

        public String finPartida
        {

            get { return _finPartida; }

            set { _finPartida = value; }

        }

        public DelegateCommand actualizarCommand
        {
            get
            {
                _actualizarCommand = new DelegateCommand(actualizarCommand_Executed);
                return _actualizarCommand;
            }
        }

        #endregion

        #region Constructor por defecto

        public ViewModel() {

            Random miAleatorio = new Random();
            clsImagen img;

            //Generamos numeros aleatorios que contendran el numero de la imagen que tiene una bomba
            _numAleatorio1 = miAleatorio.Next(0, 15);

            do{
                _numAleatorio2 = miAleatorio.Next(0, 15);
            } while (_numAleatorio2 == _numAleatorio1);

            do{
                _numAleatorio3 = miAleatorio.Next(0, 15);
            } while (_numAleatorio3 == _numAleatorio2 || _numAleatorio3 == _numAleatorio1);

            do{
                _numAleatorio4 = miAleatorio.Next(0, 15);
            } while (_numAleatorio4 == _numAleatorio3 || _numAleatorio4 == _numAleatorio2 || _numAleatorio4 == _numAleatorio1);

            //Rellenamos el listado por defecto con la imagen de presionar
            _imagenes = new List<clsImagen>();

            for (int i = 0; i< 16; i++) {
                img = new clsImagen(i, "/Assets/Imagenes/presionar.png");
                _imagenes.Add(img);
            }
        }

        #endregion

        #region
        /// <summary>
        /// Funcion que comprueba si una imagen tiene bomba o no
        /// </summary>
        /// <returns></returns>
        private bool comprobarBomba() {

            bool bomba = false;

            if (_imagenPulsada.numero == _numAleatorio1 || _imagenPulsada.numero == _numAleatorio2 || _imagenPulsada.numero == _numAleatorio3 || _imagenPulsada.numero == _numAleatorio4)
            {
                bomba = true;
            }

            return bomba;
        }

        /// <summary>
        /// Reinicia la partida
        /// </summary>
        private void actualizarCommand_Executed()
        {
            ViewModel vm = new ViewModel();
            _imagenes = vm._imagenes;
            NotifyPropertyChanged("imagenes");
            _numAleatorio1 = vm._numAleatorio1;
            _numAleatorio2 = vm._numAleatorio2;
            _numAleatorio3 = vm._numAleatorio3;
            _numAleatorio4 = vm._numAleatorio4;
            _numCartasSinBomba = 0;
            _finPartida = null;
            NotifyPropertyChanged("finPartida");
            _imagenPulsada = null;
            NotifyPropertyChanged("imagenPulsada");
        }
        #endregion
    }
}
