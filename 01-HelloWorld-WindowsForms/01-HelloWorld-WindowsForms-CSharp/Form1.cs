using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace _01_HelloWorld_WindowsForms_CSharp
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
        }

        private void btnSaludar_Click(object sender, EventArgs e)
        {
            string nombre;

            nombre = this.txtNombre.Text;

            //MessageBox.Show("Hola " + nombre);
            //Equivalente
            MessageBox.Show($"Hola {nombre}");
            //MessageBox.Show(string.Format("Hola {0}",nombre));

            //instanciar objeto de clase
            clsPersona oPersona = new clsPersona();

            oPersona.Nombre = "Dylan";
            oPersona.Apellidos = "Soler";
            MessageBox.Show($"Soy el objeto {oPersona.Nombre} {oPersona.Apellidos}");
        }

        private void txtNombre_TextChanged(object sender, EventArgs e)
        {

        }
    }
}
