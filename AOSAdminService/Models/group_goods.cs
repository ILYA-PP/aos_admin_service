using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace AOSAdminService.Models
{
    [Table("group_goods")]
    public partial class group_goods
    {
        public int id { get; set; }
        public int group_id { get; set; }
        public int goods_id { get; set; }
        public int state_id { get; set; }
        public DateTime modify { get; set; }
    }
}
