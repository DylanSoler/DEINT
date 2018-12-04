
using _14_CRUDPersonasUWP_DAL.Listados;
using _14_CRUDPersonasUWP_Entidades;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace _14_CRUDPersonasUWP_BL.Listados
{
    /// <summary>
    /// Clase que contiene distintas funciones que devuelven diferentes listados de personas
    /// </summary>
    public class clsListadoPersonas_BL
    {
        /// <summary>
        /// Función que devuelve un listado completo de personas, vacia si no hay datos o si ha habido un error
        /// </summary>
        /// <returns>List de clsPersona</returns>
        public List<clsPersona> listadoCompletoPersonas_BL() {

            List<clsPersona> listado = new List<clsPersona>();

            clsListadoPersonas_DAL listPersonasDAL = new clsListadoPersonas_DAL();

            listado = listPersonasDAL.listadoCompletoPersonas_DAL();

            return listado;
        }
    }
}
