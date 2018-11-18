using System;
using System.Collections.Generic;
using System.Linq;
//using System.Web;

namespace _14_CRUDPersonasUWP_Entidades
{
    /// <summary>
    /// Clase persona
    /// </summary>
    public class clsPersona
    {
        #region Constructor por defecto
        public clsPersona() {

        }

        #endregion

        #region Constructor por parametros
        public clsPersona(int idPersona, String nombre, String apellidos, DateTime fechaNacimiento, String direccion, String telefono, int idDepartamento)
        {
            this.idPersona = idPersona;
            this.nombre = nombre;
            this.apellidos = apellidos;
            this.fechaNacimiento = fechaNacimiento;
            this.telefono = telefono;
            this.direccion = direccion;
            this.idDepartamento = idDepartamento;
        }
        #endregion

        #region propiedadesYatributos

        public int idPersona { get; set; }
        public String nombre { get; set; }
        public String apellidos { get; set; }
        public DateTime fechaNacimiento { get; set; }
        public String direccion { get; set; }
        public String telefono { get; set; }
        public int idDepartamento { get; set;}

        #endregion

    }
}