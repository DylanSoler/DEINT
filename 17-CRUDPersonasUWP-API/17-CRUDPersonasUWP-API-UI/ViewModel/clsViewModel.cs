using _17_CRUDPersonasUWP_API_BL.Listados;
using _17_CRUDPersonasUWP_API_BL.Manejadoras;
using _17_CRUDPersonasUWP_API_Entidades;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Windows.UI.Xaml.Controls;

namespace _17_CRUDPersonasUWP_API_UI.ViewModel
{
    public class clsViewModel:clsVMBase
    {

        #region Propiedades privadas
        //private List<clsPersona> _listadoPersonas;
        private NotifyTaskCompletion<List<clsPersona>> _listadoP;
        private clsPersona _personaSeleccionada;
        //private List<clsDepartamento> _listadoDepartamentos;
        private DelegateCommand _eliminarCommand;
        private DelegateCommand _actualizarListadoCommand;
        private DelegateCommand _guardarCommand;
        private DelegateCommand _insertarCommand;
        private bool _esInsertar;
        private String _formularioVisible;
        //private String _textoBuscar;
        #endregion

        #region Propiedades publicas
        public NotifyTaskCompletion<List<clsPersona>> listadoP
        {

            get { return _listadoP; }

            set { _listadoP = value; }
        }

        public clsPersona personaSeleccionada
        {

            get
            { return _personaSeleccionada; }

            set
            {
                _personaSeleccionada = value;
                _formularioVisible = "Visible";
                _eliminarCommand.RaiseCanExecuteChanged();
                _guardarCommand.RaiseCanExecuteChanged();
                NotifyPropertyChanged("personaSeleccionada");
                NotifyPropertyChanged("formularioVisible");
            }
        }

        /*public List<clsDepartamento> listadoDepartamentos
        {

            get { return _listadoDepartamentos; }

            set { _listadoDepartamentos = value; }
        }*/

        public DelegateCommand eliminarCommand
        {
            get
            {
                _eliminarCommand = new DelegateCommand(EliminarCommand_Executed, EliminarCommand_CanExecuted);
                return _eliminarCommand;
            }
        }

        public DelegateCommand actualizarListadoCommand
        {
            get
            {
                _actualizarListadoCommand = new DelegateCommand(actualizarListadoCommand_Executed);
                return _actualizarListadoCommand;
            }
        }

        public DelegateCommand guardarCommand
        {
            get
            {
                _guardarCommand = new DelegateCommand(guardarCommand_Executed, guardarCommand_CanExecuted);
                return _guardarCommand;
            }
        }

        public DelegateCommand insertarCommand
        {
            get
            {
                _insertarCommand = new DelegateCommand(insertarCommand_Executed);
                return _insertarCommand;
            }
        }

        public String formularioVisible
        {
            get { return _formularioVisible; }

        }

        /*public String textoBuscar
        {

            get { return _textoBuscar; }

            set
            {
                _textoBuscar = value;
                filtrarListadoPorBusqueda(_textoBuscar);
                NotifyPropertyChanged("listadoPersonas");
            }
        }*/

        #endregion

        #region Commands

        /// <summary>
        /// Elimina la persona seleccionada
        /// </summary>
        private async void EliminarCommand_Executed()
        {
            int filasAfectadas;
            ContentDialog confirmadoBorrado = new ContentDialog();
            clsManejadoraPersonasBL manejadora = new clsManejadoraPersonasBL();

            confirmadoBorrado.Title = "Eliminar";
            confirmadoBorrado.Content = "¿Estas seguro de que desea borrar?";
            confirmadoBorrado.PrimaryButtonText = "Cancelar";
            confirmadoBorrado.SecondaryButtonText = "Aceptar";

            ContentDialogResult resultado = await confirmadoBorrado.ShowAsync();

            if (resultado == ContentDialogResult.Secondary)
            {
                try
                {
                    filasAfectadas = await manejadora.eliminarPersonaBL(personaSeleccionada.idPersona);
                    if (filasAfectadas == 1)
                    {
                        actualizarListadoCommand_Executed();
                    }
                }
                catch (Exception e)
                {
                    //TODO lanzar dialogo con error(message dialog)
                }
            }
        }

        /// <summary>
        /// Funcion que devuelve un booleano para habilitar o deshabilitar los controles bindeados al comando eliminar
        /// </summary>
        /// <returns></returns>
        private bool EliminarCommand_CanExecuted()
        {
            bool sePuedeEliminar = false;

            if (personaSeleccionada != null)
            {
                sePuedeEliminar = true;
            }

            return sePuedeEliminar;
        }

        /// <summary>
        /// Actualiza el listado de personas
        /// </summary>
        private void actualizarListadoCommand_Executed()
        {
            clsListadosPersonasBL gest = new clsListadosPersonasBL();

            _listadoP = new NotifyTaskCompletion<List<clsPersona>>(gest.listadoCompletoPersonasBL());
            NotifyPropertyChanged("listadoP");

            _formularioVisible = "Collapsed";
            NotifyPropertyChanged("formularioVisible");
        }


        /// <summary>
        /// Funcion que devuelve un booleano para habilitar o deshabilitar los controles bindeados al comando guardar
        /// </summary>
        /// <returns></returns>
        private bool guardarCommand_CanExecuted()
        {
            bool sePuedeGuardar = false;

            if (personaSeleccionada != null)
            {
                sePuedeGuardar = true;
            }

            return sePuedeGuardar;
        }

        /// <summary>
        /// Si _esInsertar = true, inserta una persona en la base de datos, si es false, actualiza la persona seleccionada
        /// </summary>
        private async void guardarCommand_Executed()
        {
            int filasAfectadas;
            clsManejadoraPersonasBL manejadora = new clsManejadoraPersonasBL();
            ContentDialog confirmadoCorrectamente = new ContentDialog();

            try
            {
                if (_esInsertar == false)
                {
                    filasAfectadas = await manejadora.actualizarPersonaBL(personaSeleccionada);
                    if (filasAfectadas == 1)
                    {
                        actualizarListadoCommand_Executed();

                        confirmadoCorrectamente.Title = "Guardado";
                        confirmadoCorrectamente.Content = "Se ha guardado correctamente";
                        confirmadoCorrectamente.PrimaryButtonText = "Aceptar";
                        ContentDialogResult resultado = await confirmadoCorrectamente.ShowAsync();
                    }
                }
                else
                {
                    filasAfectadas = await manejadora.insertarPersonaBL(personaSeleccionada);
                    if (filasAfectadas == 1)
                    {
                        actualizarListadoCommand_Executed();
                        personaSeleccionada = null;
                        personaSeleccionada = new clsPersona();

                        confirmadoCorrectamente.Title = "Guardado";
                        confirmadoCorrectamente.Content = "Se ha insertado correctamente";
                        confirmadoCorrectamente.PrimaryButtonText = "Aceptar";
                        ContentDialogResult resultado = await confirmadoCorrectamente.ShowAsync();
                    }
                }
            }
            catch (Exception e)
            {
                //TODO lanzar dialogo con error(message dialog)
            }
        }


        /// <summary>
        /// Vacia persona seleccionada para que se rellenen los datos de la persona a insertar, y cambia el estado de la propiedad
        /// _esInsertar a true
        /// </summary>
        private void insertarCommand_Executed()
        {
            personaSeleccionada = new clsPersona();
            _formularioVisible = "Visible";
            //NotifyPropertyChanged("formularioVisible");
            _esInsertar = true;
        }

        #endregion
        
        #region Otros metodos
        /*private void filtrarListadoPorBusqueda(String texto)
        {

            _listadoPersonas = new List<clsPersona>();

            //foreach (clsPersona persona in _listadoPersonasCompleto)
            //{

            //    if (persona.nombre.Contains(texto))
            //    {
            //        _listadoPersonas.Add(persona);
            //    }

            //}

            _listadoPersonas = _listadoPersonasCompleto.Where(p => p.nombre.Contains(texto, StringComparison.CurrentCultureIgnoreCase) || p.apellidos.Contains(texto, StringComparison.CurrentCultureIgnoreCase)).ToList();

            if (texto == "")
            {
                _formularioVisible = "Collapsed";
                NotifyPropertyChanged("formularioVisible");
            }
        }*/
        #endregion

        #region Constructor
        public clsViewModel() {

            clsListadosPersonasBL gest = new clsListadosPersonasBL();
            _listadoP = new NotifyTaskCompletion<List<clsPersona>>(gest.listadoCompletoPersonasBL());

            _formularioVisible = "Collapsed";
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
