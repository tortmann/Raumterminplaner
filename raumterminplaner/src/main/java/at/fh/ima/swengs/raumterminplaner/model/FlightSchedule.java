package at.fh.ima.swengs.raumterminplaner.model;

import at.fh.ima.swengs.raumterminplaner.util.JsonDateDeserializer;
import at.fh.ima.swengs.raumterminplaner.util.JsonDateSerializer;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

import javax.persistence.*;
import java.util.Date;
import java.util.List;



@Entity
//@JsonIdentityInfo(generator=ObjectIdGenerators.PropertyGenerator.class, property="id")

public class FlightSchedule {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @JsonDeserialize(using = JsonDateDeserializer.class)
    @JsonSerialize(using = JsonDateSerializer.class)

    //@JsonFormat(shape = JsonFormat.Shape.STRING,pattern="dd.MM.yyyy")
    @Temporal(TemporalType.DATE)
    private Date departureDate;

    private String originAirport;
    private String destinationAirport;

    private int availableSeats;

    @Version
    private long version;

    @OneToMany(mappedBy = "flightSchedule",orphanRemoval = true)
    @JsonIgnoreProperties("flightSchedule")
    private List<FlightBooking> bookings;


    public FlightSchedule() {

    }

    public FlightSchedule(Date departureDate, String originAirport, String destinationAirport, int availableSeats) {
        this.departureDate = departureDate;
        this.originAirport = originAirport;
        this.destinationAirport = destinationAirport;
        this.availableSeats = availableSeats;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Date getDepartureDate() {
        return departureDate;
    }

    public void setDepartureDate(Date departureDate) {
        this.departureDate = departureDate;
    }

    public String getOriginAirport() {
        return originAirport;
    }

    public void setOriginAirport(String originAirport) {
        this.originAirport = originAirport;
    }

    public String getDestinationAirport() {
        return destinationAirport;
    }

    public void setDestinationAirport(String destinationAirport) {
        this.destinationAirport = destinationAirport;
    }

    public int getAvailableSeats() {
        return availableSeats;
    }

    public void setAvailableSeats(int availableSeats) {
        this.availableSeats = availableSeats;
    }

    public List<FlightBooking> getBookings() {
        return bookings;
    }

    public void setBookings(List<FlightBooking> bookings) {
        this.bookings = bookings;
    }
}
