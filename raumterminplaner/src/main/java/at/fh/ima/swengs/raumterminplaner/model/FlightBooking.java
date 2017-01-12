package at.fh.ima.swengs.raumterminplaner.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;


@Entity

public class FlightBooking {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @ManyToOne
    @JsonIgnoreProperties("bookings")
    private FlightSchedule flightSchedule;

    @ManyToOne
    @JsonIgnoreProperties("bookings")
    private Passenger passenger;

    @Version
    private long version;


    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public FlightSchedule getFlightSchedule() {
        return flightSchedule;
    }

    public void setFlightSchedule(FlightSchedule flightSchedule) {
        this.flightSchedule = flightSchedule;
    }

    public Passenger getPassenger() {
        return passenger;
    }

    public void setPassenger(Passenger passenger) {
        this.passenger = passenger;
    }
}
