using _17_CRUDPersonasUWP_API_DAL.Listados;
using _17_CRUDPersonasUWP_API_Entidades;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace _17_CRUDPersonasUWP_API_BL.Listados
{
    public class clsListadosPersonasBL
    {

        /// <summary>
        /// Metodo que llama a la DAL y devuelve el listado completo de personas
        /// </summary>
        /// <returns>List de clsPersonas</returns>
        public async Task<List<clsPersona>> listadoCompletoPersonasBL()
        {
            clsListadosPersonasDAL listadosDAL = new clsListadosPersonasDAL();
            List<clsPersona> listado = new List<clsPersona>();

            listado = await listadosDAL.listadoCompletoPersonasDAL();

            return listado;
        }

    }
}
