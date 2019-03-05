using CRUDPersonasXamarinEntidades;
using System;
using System.Collections.Generic;
using System.Text;

namespace CRUDPersonasXamarinUI.ViewModels
{
    public class ViewModelDetalles
    {
        private clsPersona _persona;

        public clsPersona persona
        {

            get
            { return _persona; }

            set
            {
                _persona = value;
                //await Navigation.PushAsync(new DetallesPersona());
                //Xamarin.Forms.Application.Current.MainPage.Navigation.PushAsync(new DetallesPersona());

                //_formularioVisible = "Visible";
                //_eliminarCommand.RaiseCanExecuteChanged();
                //_guardarCommand.RaiseCanExecuteChanged();
                //NotifyPropertyChanged("personaSeleccionada");
                //NotifyPropertyChanged("formularioVisible");
            }
        }
    }
}
