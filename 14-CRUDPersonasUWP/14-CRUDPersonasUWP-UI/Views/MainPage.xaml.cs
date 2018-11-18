using _14_CRUDPersonasUWP_BL.Manejadoras;
using _14_CRUDPersonasUWP_Entidades;
using _14_CRUDPersonasUWP_UI.ViewModels;
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

namespace _14_CRUDPersonasUWP_UI.Views
{
    public sealed partial class MainPage : Page
    {
        public MainPage()
        {
            this.InitializeComponent();

        }

        /// <summary>
        /// Evento asociado al botón de Guardar
        /// Actualiza la persona seleccionada
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        /*private void btnGuardar_Click(object sender, RoutedEventArgs e)
        {
            if (String.IsNullOrEmpty(txbID.Text)==false)
            {
                int filas;

                clsPersona oPersona = new clsPersona();
                oPersona.idPersona = int.Parse(txbID.Text);
                oPersona.nombre = txbNombre.Text;
                oPersona.apellidos = txbApellidos.Text;
                oPersona.fechaNacimiento = DateTime.Parse(txbFechaNac.Text);
                oPersona.direccion = txbDireccion.Text;
                oPersona.telefono = txbTelefono.Text;
                oPersona.idDepartamento = int.Parse(txbIdDepart.Text);

                clsManejadoraPersona_BL manejadora = new clsManejadoraPersona_BL();
                filas = manejadora.editarPersona_BL(oPersona);

                pagePrincipal.DataContext = new MainPageViewModel();
            }
        }*/

        /// <summary>
        /// Evento asociado al botón de Eliminar
        /// Elimina la persona seleccionada
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        //private void btnEliminar_Click(object sender, RoutedEventArgs e)
        //{
        //    int filas;
        //    int id = int.Parse(txbID.Text);
        //    clsManejadoraPersona_BL manejadora = new clsManejadoraPersona_BL();
        //    filas = manejadora.borrarPersonaPorID_BL(id);

        //}

        /// <summary>
        /// Evento asociado al botón de Actualizar
        /// Actualiza la pagina
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        //private void btnActualizar_Click(object sender, RoutedEventArgs e)
        //{
        //    //TODO
        //    //this.Frame.Navigate(typeof(MainPage));
        //    pagePrincipal.DataContext = new MainPageViewModel();
        //}

        /// <summary>
        /// Evento asociado al boton Añadir
        /// Inserta una persona en la BBDD
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        //private void btnInsertar_Click(object sender, RoutedEventArgs e)
        //{
        //    //TODO

        //    //int filas;

        //    //clsPersona oPersona = new clsPersona(); 

        //    //clsManejadoraPersona_BL manejadora = new clsManejadoraPersona_BL();
        //    //filas = manejadora.editarPersona_BL(oPersona);
        //}
    }
}
