using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Employee_Designation.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            ViewBag.Title = "Home Page";

            return View();
        }

        public ActionResult Designation()
        {
            return View();
        }

        public ActionResult FetchingTable()
        {
            return View();
        }

        public ActionResult Carr()
        {
            return View();
        }

        public ActionResult EmployeeLaptop(int EmpName)
        {
            Session["xyz"] = EmpName;
            return View();
        }
    }
}
