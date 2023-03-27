using Employee_Designation.Models;
using System;
using System.Collections.Generic;
using System.Dynamic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Employee_Designation.Controllers.api
{

    [RoutePrefix("api/Carr")]
    public class CarController : ApiController
    {
        //table List
        [HttpGet]
        [Route("Getcarr")]

        public ExpandoObject Getcarr()
        {
            dynamic data = new ExpandoObject();

            carDataContext DB = new carDataContext();

            var list = DB.Cars.Select(e => new { Carsid = e.Carsid, BrandName = e.BrandName, ModelName = e.ModelName, Year = e.Year, Price = e.Price, New = e.New }).ToList();


            data.List = list;
            return data;
        }



        //angucomplete
        [HttpGet]
        [Route("GetFilterLap")]

        public ExpandoObject GetFilterLap(string Brand)
        {
            dynamic data = new ExpandoObject();

            carDataContext DB = new carDataContext();

            var list = DB.Cars.Where(a=>a.BrandName.Contains(Brand)).Select(e => new { Carsid = e.Carsid, BrandName = e.BrandName, ModelName = e.ModelName, Year = e.Year, Price = e.Price, New = e.New }).ToList();
            data.anyMessage = "Success";

            data.List = list;
            return data;
        }

        //save Car
        [HttpPost]
        [Route("PostCar")]
        public string SaveLaptop(Car topcar)
        {
            if (topcar != null)
            {

                carDataContext Db = new carDataContext();

                Db.Cars.InsertOnSubmit(topcar);
                Db.SubmitChanges();
                return "Success";
            }
            else
            {
                return "failed";
            }
        }
        //update Car
        [HttpPost]
        [Route("Updatecar")]
        public String Update(Car newlap)
        {
           carDataContext  Db = new carDataContext();
            {
                Car carr = Db.Cars.FirstOrDefault(e => e.Carsid == newlap.Carsid);

                if (carr != null)
                {

                    carr.Carsid = newlap.Carsid;
                    carr.BrandName = newlap.BrandName;
                    carr.ModelName = newlap.ModelName;
                    carr.Year = newlap.Year;
                    carr.Price = newlap.Price;
                    carr.New = newlap.New;

                    Db.SubmitChanges();
                    return "Success";

                }
                else
                {
                    return "failed";
                }
            }
        }

        //Deletecar
        [HttpGet]
        [Route("GetDeletecar")]
        public ExpandoObject GetDeletecar(int Carsid)
        {

            dynamic data = new ExpandoObject();
            carDataContext Db = new carDataContext();
            try
            {
                var list = Db.Cars.Where(x => x.Carsid == Carsid).First();
                Db.Cars.DeleteOnSubmit(list);
                Db.SubmitChanges();
                data.message = ConstantData.SuccessMessage;
            }
            catch (Exception ex)
            {
                data.message = ex.Message;
            }
            return data;
        }


    }
}