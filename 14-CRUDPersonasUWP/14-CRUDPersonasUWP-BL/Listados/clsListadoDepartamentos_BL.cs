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
    /// Clase que contiene distintas funciones que devuelven diferentes listados de departamentos
    /// </summary>
    public class clsListadoDepartamentos_BL
    {
        /// <summary>
        /// Función que devuelve un listado completo de departamentos, vacio si no hay datos o si ha habido un error
        /// </summary>
        /// <returns>List de clsDepartamentos</returns>
        public List<clsDepartamento> listadoCompletoPersonas_BL()
        {

            List<clsDepartamento> listado = new List<clsDepartamento>();

            clsListadoDepartamentos_DAL listDepartamentosDAL = new clsListadoDepartamentos_DAL();

            listado = listDepartamentosDAL.listadoCompletoDepartamentos_DAL();

            return listado;
        }

    }
}
