using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PruebaExamenLoL.Models
{
    /// <summary>
    /// Clase clsPersonaje, entidad de persistencia de la tabla personajes de la base de datos
    /// </summary>
    public class clsPersonaje
    {
        #region Propiedades
        public int idPersonaje { get; set; }
        public String nombre { get; set; }
        public String alias { get; set; }
        public double vida { get; set; }
        public double regeneracion { get; set; }
        public double danno { get; set; }
        public double armadura { get; set; }
        public double velAtaque { get; set; }
        public double resistencia { get; set; }
        public double velMovimiento { get; set; }
        public int idCategoria { get; set; }
        #endregion

    }
}
