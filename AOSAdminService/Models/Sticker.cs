using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace AOSAdminService.Models
{
    [Table("sticker")]
    public class Sticker
    {
        [Key]
        public int id { get; set; }
        public string name { get; set; }
        public string background_color { get; set; }
        public string font_color { get; set; }
        public DateTime modify { get; set; }
    }
}
