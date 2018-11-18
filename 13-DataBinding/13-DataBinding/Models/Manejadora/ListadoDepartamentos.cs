using _13_DataBinding.Models.Entidades;
using System;
using System.Collections.Generic;
using System.Linq;


namespace _13_DataBinding.Models.Manejadora
{
    public class clsListadoDepartamentos
    {
        #region Propiedades
        public List<clsDepartamento> listadoDepartamentos { get; set; }
        #endregion

        /// <summary>
        /// Metodo que devuelve un listado de todos los departamentos
        /// </summary>
        /// <returns>List<clsDepartamento> departamentos </returns>
        public List<clsDepartamento> listadoCompletoDepartamentos()
        {

            List<clsDepartamento> departamentos = new List<clsDepartamento>();

            departamentos.Add(new clsDepartamento(1, "Administracion"));
            departamentos.Add(new clsDepartamento(2, "Marketing y venta"));
            departamentos.Add(new clsDepartamento(3, "Compras"));
            departamentos.Add(new clsDepartamento(4, "RRHH"));



            return departamentos;

        }
    }
}