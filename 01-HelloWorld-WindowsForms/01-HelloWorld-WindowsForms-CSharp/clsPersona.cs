using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace _01_HelloWorld_WindowsForms_CSharp
{
    /* Nombre: clsPersona
     * Atributos: nombre C/M
     *            apellidos C/M
     */   
    public class clsPersona
    {
        #region "Atributos"
        //_atributo para atributos privados de la clase
        private String _nombre;
        private String _apellidos;
        #endregion

        
        /*public clsPersona(String nombre, String apellidos)
        {
            this._nombre = nombre;
            this._apellidos = apellidos;
            }*/

        #region "Propiedades"
        public String  Nombre
        {
            get { return this._nombre; }
            set { this._nombre=value; }
        }

        public String Apellidos
        {
            get { return this._apellidos; }
            set { this._apellidos = value; }
        }

        //prop tabulador tabulador
        //Cuando no queremos validar en el set
        //public int MyProperty { get; set; }

        #endregion


    }
}
