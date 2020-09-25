namespace AOSAdminService.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;

    [Table("goods")]
    public partial class goods
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public goods()
        {
            price_fix = new HashSet<price_fix>();
        }

        [Key]
        public int id { get; set; }

        public int? catalog_id { get; set; }

        [StringLength(250)]
        public string name { get; set; }

        [StringLength(250)]
        public string producer { get; set; }

        [StringLength(150)]
        public string country { get; set; }

        public int? state_id { get; set; }

        public bool? is_receipt { get; set; }

        public bool? is_payable { get; set; }

        public DateTime? modify { get; set; }

        [StringLength(100)]
        public string slug { get; set; }
        public string description { get; set; }
        [NotMapped]
        public string markGroup { get; set; }
        [NotMapped]
        public string vidal { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<price_fix> price_fix { get; set; }
    }
}
