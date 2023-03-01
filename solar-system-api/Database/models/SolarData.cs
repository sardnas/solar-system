using System.ComponentModel.DataAnnotations;

namespace solar_system_api.Database.models
{
    public class SolarData
    {
        [Key]
        public int Id { get; set; }

        public string Name { get; set; }

        public bool IsPlanet { get; set; }

        public float Density { get; set; }

        public string Gravity { get; set; }

        public float MeanRadius { get; set; }

        public string MassKg { get; set; }

        public string Orbit { get; set; }
    }
}


//id name isPlanet density	gravity	meanRadius	massKg	orbits
