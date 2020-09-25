namespace AOSAdminService.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;

    [Table("price_fix")]
    public partial class price_fix
    {
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int id { get; set; }

        public int? goods_id { get; set; }

        public int? city_id { get; set; }

        public decimal? value { get; set; }

        [Column(TypeName = "date")]
        public DateTime? date_start { get; set; }

        [Column(TypeName = "date")]
        public DateTime? date_end { get; set; }

        public DateTime? modify { get; set; }

        [StringLength(1024)]
        public string comment { get; set; }

        public int? state_id { get; set; }

        public virtual goods goods { get; set; }
    }
}
