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
        private NotifyTaskCompletion<List<clsPersona>> _listadoP;
        #endregion

        #region Propiedades publicas
        public NotifyTaskCompletion<List<clsPersona>> listadoP
        {

            get { return _listadoP; }

            set { _listadoP = value; }
        }
        #endregion

        #region Constructor
        public clsViewModel() {

            clsListadosPersonasBL gest = new clsListadosPersonasBL();
            _listadoP = new NotifyTaskCompletion<List<clsPersona>>(gest.listadoCompletoPersonasBL());
        }
        #endregion

        /*private async void InitializeAsync()
        {
            _progRing = true;
            NotifyPropertyChanged("progRing");
            clsListadosPersonasBL gest = new clsListadosPersonasBL();
            
            _listadoP = await gest.listadoCompletoPersonasBL();
            NotifyPropertyChanged("listadoP");
            _progRing = false;
            NotifyPropertyChanged("progRing");
        }*/

    }
}
