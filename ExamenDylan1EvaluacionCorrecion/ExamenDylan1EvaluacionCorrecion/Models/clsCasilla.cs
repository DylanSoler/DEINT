using ExamenDylan1EvaluacionCorrecion.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ExamenDylan1EvaluacionCorrecion.Models
{
    /// <summary>
    /// Clase clsCasilla
    /// Atributos : String rutaImagen, bool esBomba, bool estaPulsada
    /// </summary>
    public class clsCasilla : clsVMBase
    {

        #region Propiedades privadas

        private String _rutaImagen;

        #endregion

        #region Propiedades publicas
        public bool esBomba { get; set; }
        public String rutaImagen {

            get {return _rutaImagen;}
            set {
                  _rutaImagen = value;
                  NotifyPropertyChanged("rutaImagen");
                }
        }
        #endregion

        #region Constructor
        public clsCasilla(bool bomba) {

            this.rutaImagen = "/Assets/Imagenes/presionar.png";
            this.esBomba = bomba;

        }
        #endregion
    }
}
