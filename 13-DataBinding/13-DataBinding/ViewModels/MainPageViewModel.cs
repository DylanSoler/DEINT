using _13_DataBinding.Models.Entidades;
using _13_DataBinding.Models.Manejadora;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;

namespace _13_DataBinding.ViewModels
{
    public class MainPageViewModel:INotifyPropertyChanged
    {

        #region Propiedades privadas

        private List<clsPersona> _listadoPersonas;
        private clsPersona _personaSeleccionada;
        private List<clsDepartamento> _listadoDepartamentos;

        public event PropertyChangedEventHandler PropertyChanged;

        #endregion

        #region Propiedades publicas
        public List<clsPersona> listadoPersonas {

            get {return _listadoPersonas;}

            set {_listadoPersonas = value;}
        }

        public clsPersona personaSeleccionada {

            get { return _personaSeleccionada; }

            set { _personaSeleccionada = value;
                  NotifyPropertyChanged();  }
        }

        public List<clsDepartamento> listadoDepartamentos
        {

            get { return _listadoDepartamentos; }

            set { _listadoDepartamentos = value; }
        }
        #endregion

        #region Constructor por defecto
        public MainPageViewModel() {

            //cargar listado de personas
            clsListadoPersonas listPersonas = new clsListadoPersonas();
            _listadoPersonas = listPersonas.listadoCompletoPersonas();

            clsListadoDepartamentos listDep = new clsListadoDepartamentos();
            _listadoDepartamentos = listDep.listadoCompletoDepartamentos();

        }
        #endregion

        private void NotifyPropertyChanged([CallerMemberName] String propertyName = "")
        {
            PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(propertyName));
        }

    }
}
