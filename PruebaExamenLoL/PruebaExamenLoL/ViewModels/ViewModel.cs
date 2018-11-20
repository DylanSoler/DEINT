using PruebaExamenLoL.Datos;
using PruebaExamenLoL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PruebaExamenLoL.ViewModels
{
    public class ViewModel:clsVMBase
    {
        #region Propiedades privadas

        private List<clsPersonaje> _listadoPersonajesPorCategoria;
        private List<clsCategoria> _listadoCategoriasCompleto;
        private clsPersonaje _personajeSeleccionado;
        private int _IDcategoriaSeleccionada;
        private String _imagen;
        private String _esVisibleListado;
        private String _esVisibleDetails;

        #endregion

        #region Propiedades publicas 

        public List<clsPersonaje> listadoPersonajesPorCategoria
        {

            get{ return _listadoPersonajesPorCategoria; }

            set{ _listadoPersonajesPorCategoria = value; }

        }

        public List<clsCategoria> listadoCategoriasCompleto
        {

            get { return _listadoCategoriasCompleto; }

            set { _listadoCategoriasCompleto = value; }
        }

        public clsPersonaje personajeSeleccionado
        {

            get { return _personajeSeleccionado; }

            set { _personajeSeleccionado = value;
                NotifyPropertyChanged("personajeSeleccionado");
                if (_personajeSeleccionado != null && _listadoPersonajesPorCategoria.Capacity>0)
                {
                    _imagen = "/Assets/" + _personajeSeleccionado.nombre + ".png";
                    NotifyPropertyChanged("imagen");
                    _esVisibleDetails = "Visible";
                    NotifyPropertyChanged("esVisibleDetails");
                }
                else {
                    _imagen = "";
                    NotifyPropertyChanged("imagen");
                    _esVisibleDetails = "Collapsed";
                    NotifyPropertyChanged("esVisibleDetails");
                }
            }
        }

        public int IDcategoriaSeleccionada
        {

            get { return _IDcategoriaSeleccionada; }

            set { _IDcategoriaSeleccionada = value;

                clsListados manejadora = new clsListados();
                _listadoPersonajesPorCategoria = manejadora.listadoPersonajesPorCategoria(_IDcategoriaSeleccionada);
                NotifyPropertyChanged("listadoPersonajesPorCategoria");

                _esVisibleListado = "Visible";
                NotifyPropertyChanged("esVisibleListado");
                }
        }

        public String imagen
        {

            get { return _imagen; }

            set { _imagen = value; }
        }

        public String esVisibleListado
        {

            get { return _esVisibleListado; }

            set { _esVisibleListado = value; }
        }

        public String esVisibleDetails
        {

            get { return _esVisibleDetails; }

            set { _esVisibleDetails = value; }
        }
        #endregion

        #region Constructor

        public ViewModel() {

            clsListados manejadora = new clsListados();

            _listadoCategoriasCompleto = manejadora.listadoCompletoCategorias();
            _esVisibleListado = "Collapsed";
            _esVisibleDetails = "Collapsed";
        }

        #endregion
    }
}
