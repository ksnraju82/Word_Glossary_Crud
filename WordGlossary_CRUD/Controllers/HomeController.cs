using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WordGlossary_CRUD.Models;
using System.Data.Entity;

namespace WordGlossary_CRUD.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();

        }

        // GET: All Glossary
        public JsonResult GetAllTerms()
        {
            using (GlossaryDBContextCRUD contextObj = new GlossaryDBContextCRUD())
            {

                var GlossaryList = contextObj.glossary.ToList();
                return Json(GlossaryList, JsonRequestBehavior.AllowGet);

            }
        }
        //GET: Glossary by Id
        public JsonResult GetTermById(string id)
        {
            using (GlossaryDBContextCRUD contextObj = new GlossaryDBContextCRUD())
            {
                var termId = Convert.ToInt32(id);
                var getTermById = contextObj.glossary.Find(termId);
                return Json(getTermById, JsonRequestBehavior.AllowGet);
            }
        }
        //Update Glossary
        public string UpdateGlossaryTerm(Glossary glossary)
        {
            if (glossary != null)
            {
                using (GlossaryDBContextCRUD contextObj = new GlossaryDBContextCRUD())
                {
                    int termId = Convert.ToInt32(glossary.Id);
                    Glossary _glossaryTerm = contextObj.glossary.Where(b => b.Id == termId).FirstOrDefault();
                    _glossaryTerm.Term = glossary.Term;
                    _glossaryTerm.Definition = glossary.Definition;

                    contextObj.SaveChanges();
                    return "Glossary record updated successfully";
                }
            }
            else
            {
                return "Invalid Glossary record";
            }
        }
        // Add Glossary
        public string AddGlossary(Glossary glossary)
        {
            if (glossary != null)
            {
                using (GlossaryDBContextCRUD contextObj = new GlossaryDBContextCRUD())
                {
                    contextObj.glossary.Add(glossary);
                    contextObj.SaveChanges();
                    return "Glossary record added successfully";
                }
            }
            else
            {
                return "Invalid Glossary record";
            }
        }
        // Delete Glossary
        public string DeleteGlossary(string glossaryId)
        {

            if (!String.IsNullOrEmpty(glossaryId))
            {
                try
                {
                    int _glossaryId = Int32.Parse(glossaryId);
                    using (GlossaryDBContextCRUD contextObj = new GlossaryDBContextCRUD())
                    {
                        var _glossaryItem = contextObj.glossary.Find(_glossaryId);
                        contextObj.glossary.Remove(_glossaryItem);
                        contextObj.SaveChanges();
                        return "Selected Glossary record deleted sucessfully";
                    }
                }
                catch (Exception)
                {
                    return "Glossary details not found";
                }
            }
            else
            {
                return "Invalid operation";
            }
        }
    }
}