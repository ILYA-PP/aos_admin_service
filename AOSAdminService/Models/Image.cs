using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace AOSAdminService.Models
{
    [Table("public.image")]
    public partial class Image
    {
        [Key]
        public int id { get; set; }
        public string path { get; set; }
        public DateTime? modify { get; set; }
    }
}
