using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Employee_Designation.Models
{
    public partial class EmployeeModel
    {
        private int _Empl_Id;

        private string _Empl_Name;

        private string _DesName;

        public int Empl_Id { get => _Empl_Id; set => _Empl_Id = value; }
        public string Empl_Name { get => _Empl_Name; set => _Empl_Name = value; }
        public string DesName { get => _DesName; set => _DesName = value; }
    }
    public partial class StafModel
    {
        private int _EmplId;

        private string _EmplName;

        private string _DesId;

        public int EmplId { get => _EmplId; set => _EmplId = value; }
        public string EmplName { get => _EmplName; set => _EmplName = value; }
        public string DesId { get => _DesId; set => _DesId = value; }
    }
    public partial class DesignationModel
    {
        private int _DesId;

        private string _DesName;

        private string _DesCode;

        private string _Details;

        private string _Salary;

        public int DesId { get => _DesId; set => _DesId = value; }
        public string DesName { get => _DesName; set => _DesName = value; }
        public string DesCode { get => _DesCode; set => _DesCode = value; }
        public string Details { get => _Details; set => _Details = value; }
        public string Salary { get => _Salary; set => _Salary = value; }
    }
}