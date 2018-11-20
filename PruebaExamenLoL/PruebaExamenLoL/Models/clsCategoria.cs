using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PruebaExamenLoL.Models
{
    /// <summary>
    /// Clase clsCategoria, entidad de persistencia de la tabla personajes de la base de datos
    /// </summary>
    public class clsCategoria
    {
        #region Propiedades
        public int idCategoria { get; set; }
        public String nombreCategoria { get; set; }
        #endregion
    }
}
