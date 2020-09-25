using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace AOSAdminService.Models
{
    [Table("price")]
    public partial class price
    {
        [Key]
        public int id { get; set; }
        public int pricelist_id { get; set; }
        public int goods_id { get; set; }
        public double value { get; set; }
        public double old_value { get; set; }
        public int state_id { get; set; }
        public int storage_id { get; set; }
        //public DateTime modify { get; set; }
    }
}
