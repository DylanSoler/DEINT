using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Runtime.InteropServices.WindowsRuntime;
using Windows.Foundation;
using Windows.Foundation.Collections;
using Windows.UI.Xaml;
using Windows.UI.Xaml.Controls;
using Windows.UI.Xaml.Controls.Primitives;
using Windows.UI.Xaml.Data;
using Windows.UI.Xaml.Input;
using Windows.UI.Xaml.Media;
using Windows.UI.Xaml.Navigation;

// La plantilla de elemento Página en blanco está documentada en https://go.microsoft.com/fwlink/?LinkId=402352&clcid=0xc0a

namespace _07_Grid_Validar_Formulario
{
    /// <summary>
    /// Página vacía que se puede usar de forma independiente o a la que se puede navegar dentro de un objeto Frame.
    /// </summary>
    public sealed partial class MainPage : Page
    {
        public MainPage()
        {
            this.InitializeComponent();
        }

        /// <summary>
        /// Metodo que valida que los campos nombre, apellidos y edad no esten vacios
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        private void Guardar_Click(object sender, RoutedEventArgs e)
        {
            if (String.IsNullOrEmpty(txtNombre.Text))
            { txtBlErrorNombre.Text = "Debe introducir un nombre"; }
            else
            { txtBlErrorNombre.Text = ""; }

            if (String.IsNullOrEmpty(txtApellidos.Text))
            { txtBlErrorApellidos.Text = "Debe introducir los apellidos"; }
            else
            { txtBlErrorApellidos.Text = ""; }

            if (String.IsNullOrEmpty(txtEdad.Text))
            { txtBlErrorEdad.Text = "Debe introducir su edad"; }
            else
            { txtBlErrorEdad.Text = ""; }
        }
    }
}
