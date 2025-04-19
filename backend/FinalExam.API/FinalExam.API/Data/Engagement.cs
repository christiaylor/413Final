using System.ComponentModel.DataAnnotations;

namespace FinalExam.API.Data
{
    public class Engagement
    {
        [Key]
        public int EntertainerID { get; set; }
        public string EntStageName { get; set; }
        public int EngagementCount { get; set; }
        public DateTime? StartDate { get; set; } // Renamed for clarity
    }
}
