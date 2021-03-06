﻿
using _14_CRUDPersonasUWP_BL.Listados;
using _14_CRUDPersonasUWP_BL.Manejadoras;
using _14_CRUDPersonasUWP_Entidades;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;
using Windows.UI.Xaml.Controls;

namespace _14_CRUDPersonasUWP_UI.ViewModels
{
    public class MainPageViewModel:clsVMBase
    {

        #region Propiedades privadas

        private List<clsPersona> _listadoPersonas;
        private List<clsPersona> _listadoPersonasCompleto;
        private String _textoBuscar;
        private clsPersona _personaSeleccionada;
        private List<clsDepartamento> _listadoDepartamentos;
        private DelegateCommand _eliminarCommand;
        private DelegateCommand _actualizarListadoCommand;
        private DelegateCommand _guardarCommand;
        private DelegateCommand _insertarCommand;
        private bool _esInsertar;
        private String _formularioVisible;

        //public event PropertyChangedEventHandler PropertyChanged;

        #endregion

        #region Propiedades publicas
        public List<clsPersona> listadoPersonas {

            get {return _listadoPersonas;}

            set {_listadoPersonas = value;}
        }

        public clsPersona personaSeleccionada {

            get
            {return _personaSeleccionada; }

            set {

                if (_personaSeleccionada != value)
                {
                    _personaSeleccionada = value;
                    _formularioVisible = "Visible";
                    //llamamos a CanExecute de eliminar para que compruebe si habilita el comando
                    _eliminarCommand.RaiseCanExecuteChanged();
                    _guardarCommand.RaiseCanExecuteChanged();
                    NotifyPropertyChanged("personaSeleccionada");
                    NotifyPropertyChanged("formularioVisible");
                }
            }
        }

        public List<clsDepartamento> listadoDepartamentos
        {

            get { return _listadoDepartamentos; }

            set { _listadoDepartamentos = value; }
        }

        public DelegateCommand eliminarCommand
        {
            get {
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
            //cuando la vista no proporcione datos al viewmodel de esta propiedad no hace falta set
            //x:bin requiere que tenga set
            set { _formularioVisible = value; }

        }

        public String textoBuscar
        {

            get { return _textoBuscar; }

            set { _textoBuscar = value;
                filtrarListadoPorBusqueda(_textoBuscar);
                NotifyPropertyChanged("listadoPersonas");
                }
        }
        #endregion

        /// <summary>
        /// Elimina la persona seleccionada de la BBDD
        /// </summary>
        private async void EliminarCommand_Executed()
        {
            int filasAfectadas;
            ContentDialog confirmadoBorrado = new ContentDialog();
            clsManejadoraPersona_BL manejadora = new clsManejadoraPersona_BL();

            confirmadoBorrado.Title="Eliminar";
            confirmadoBorrado.Content = "¿Estas seguro de que desea borrar?";
            confirmadoBorrado.PrimaryButtonText = "Cancelar";
            confirmadoBorrado.SecondaryButtonText = "Aceptar";

            ContentDialogResult resultado = await confirmadoBorrado.ShowAsync();

            if (resultado == ContentDialogResult.Secondary)
            {
                try
                {
                    filasAfectadas = manejadora.borrarPersonaPorID_BL(personaSeleccionada.idPersona);
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
            clsListadoPersonas_BL oListados = new clsListadoPersonas_BL();

            _listadoPersonas = oListados.listadoCompletoPersonas_BL();
            NotifyPropertyChanged("listadoPersonas");
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
            clsManejadoraPersona_BL manejadora = new clsManejadoraPersona_BL();
            ContentDialog confirmadoCorrectamente = new ContentDialog();

            try
                {
                    if (_esInsertar == false)
                    {
                        filasAfectadas = manejadora.editarPersona_BL(personaSeleccionada);
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
                        filasAfectadas = manejadora.insertarPersona_BL(personaSeleccionada);
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
                } catch (Exception e)
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
            //NotifyPropertyChanged("personaSeleccionada");
            _formularioVisible = "Visible";
            //NotifyPropertyChanged("formularioVisible");
            _esInsertar = true;
        }


        private void filtrarListadoPorBusqueda(String texto) {

            _listadoPersonas = new List<clsPersona>();

            //foreach (clsPersona persona in _listadoPersonasCompleto)
            //{

            //    if (persona.nombre.Contains(texto))
            //    {
            //        _listadoPersonas.Add(persona);
            //    }

            //}

            _listadoPersonas = _listadoPersonasCompleto.Where(p => p.nombre.Contains(texto, StringComparison.CurrentCultureIgnoreCase) || p.apellidos.Contains(texto, StringComparison.CurrentCultureIgnoreCase)).ToList();

            if (texto == "") {
                clsListadoPersonas_BL listPersonas = new clsListadoPersonas_BL();
                _listadoPersonas = listPersonas.listadoCompletoPersonas_BL();
                _formularioVisible = "Collapsed";
                NotifyPropertyChanged("formularioVisible");
            }
        }


        #region Constructor por defecto
        public MainPageViewModel() {

            clsListadoPersonas_BL listPersonas = new clsListadoPersonas_BL();
            clsListadoDepartamentos_BL listDepartamentos = new clsListadoDepartamentos_BL();

            _listadoPersonas = listPersonas.listadoCompletoPersonas_BL();
            _listadoPersonasCompleto = listPersonas.listadoCompletoPersonas_BL();
            _listadoDepartamentos = listDepartamentos.listadoCompletoDepartamentos_BL();

            _formularioVisible = "Collapsed";

        }
        #endregion
        //Al utilizar clsVMBase no se necesita

        //private void NotifyPropertyChanged([CallerMemberName] String propertyName = "")
        //{
        //    PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(propertyName));
        //}

    }
}
