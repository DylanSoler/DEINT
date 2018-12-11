using _17_CRUDPersonasUWP_API_BL.Listados;
using _17_CRUDPersonasUWP_API_Entidades;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace _17_CRUDPersonasUWP_API_UI.ViewModel
{
    public class clsViewModel:clsVMBase
    {

        #region Propiedades privadas
        private List<clsPersona> _listadoP;
        private bool _progRing;
        #endregion

        #region Propiedades publicas
        public List<clsPersona> listadoP
        {

            get { return _listadoP; }

            set { _listadoP = value; }
        }

        public bool progRing
        {

            get { return _progRing; }

            set { _progRing = value; }
        }
        #endregion

        #region Constructor
        public clsViewModel() {

            InitializeAsync();
        }
        #endregion

        private async void InitializeAsync()
        {
            _progRing = true;
            NotifyPropertyChanged("progRing");
            clsListadosPersonasBL gest = new clsListadosPersonasBL();
            
            _listadoP = await gest.listadoCompletoPersonasBL();
            NotifyPropertyChanged("listadoP");
            _progRing = false;
            NotifyPropertyChanged("progRing");
        }

    }
}
