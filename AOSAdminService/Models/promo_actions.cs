using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace AOSAdminService.Models
{
    [Table("promo_actions")]
    public partial class promo_actions
    {
        [Key]
        public int id { get; set; }
        public string title { get; set; }
        public string description { get; set; }
        public int city_id { get; set; }
        public DateTime date_start { get; set; }
        public DateTime date_end { get; set; }
        public int image_id { get; set; }
        public int state_id { get; set; }
        public int banner_type_id { get; set; }
    }
}
