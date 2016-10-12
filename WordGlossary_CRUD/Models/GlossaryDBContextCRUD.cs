using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Entity;

namespace WordGlossary_CRUD.Models
{
    public class GlossaryDBContextCRUD : DbContext
    {
        public DbSet<Glossary> glossary { get; set; }
    }
}