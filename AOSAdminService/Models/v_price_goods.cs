using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace AOSAdminService.Models
{
    public partial class v_price_goods
    {
        public int id { get; set; }
        public int good_id { get; set; }
        public string name { get; set; }
        public double value { get; set; }
        public double old_value { get; set; }
    }
}
