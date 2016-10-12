using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WordGlossary_CRUD.Models
{
    public class Glossary
    {
        public int Id { get; set; }
        public string Term { get; set; }
        public string Definition { get; set; }
    }
}