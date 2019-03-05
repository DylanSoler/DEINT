using CRUDPersonasXamarinEntidades;
using CRUDPersonasXamarinUI.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Xamarin.Forms;
using Xamarin.Forms.Xaml;

namespace CRUDPersonasXamarinUI
{
	[XamlCompilation(XamlCompilationOptions.Compile)]
	public partial class DetallesPersona : ContentPage
	{

        public DetallesPersona ()
		{
			InitializeComponent ();
		}

        public DetallesPersona(clsPersona persona)
        {
            InitializeComponent();
            ViewModelDetalles vm = new ViewModelDetalles();
            vm.persona = persona;
            BindingContext = vm;
            //TODO asignar persona a el nuevo vm.personaSeleccionada
        }

    }
}