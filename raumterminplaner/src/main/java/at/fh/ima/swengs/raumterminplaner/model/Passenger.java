package at.fh.ima.swengs.raumterminplaner.model;

import at.fh.ima.swengs.raumterminplaner.util.JsonDateDeserializer;
import at.fh.ima.swengs.raumterminplaner.util.JsonDateSerializer;
import com.fasterxml.jackson.annotation.*;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

import javax.persistence.*;
import java.util.Date;
import java.util.List;



@Entity
public class Passenger {


    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    private String firstName;

    private String lastName;

    @JsonIgnore
    private String password;

    @JsonDeserialize(using = JsonDateDeserializer.class)
    @JsonSerialize(using = JsonDateSerializer.class)
    @Temporal(TemporalType.DATE)
    //@JsonFormat(shape = JsonFormat.Shape.STRING,pattern = "dd.MM.yyyy")
    private Date dayOfBirth;

    private int bonusMiles;

    @OneToMany(mappedBy = "passenger",orphanRemoval = true)
    @JsonIgnoreProperties("passenger")
    private List<FlightBooking> bookings;

    @Version
    private long version;


    public Passenger() {
    }

    public Passenger(String firstName, String lastName, Date dayOfBirth, int bonusMiles) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.dayOfBirth = dayOfBirth;
        this.bonusMiles = bonusMiles;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public Date getDayOfBirth() {
        return dayOfBirth;
    }

    public void setDayOfBirth(Date dayOfBirth) {
        this.dayOfBirth = dayOfBirth;
    }

    public int getBonusMiles() {
        return bonusMiles;
    }

    public void setBonusMiles(int bonusMiles) {
        this.bonusMiles = bonusMiles;
    }

    public List<FlightBooking> getBookings() {
        return bookings;
    }

    public void setBookings(List<FlightBooking> bookings) {
        this.bookings = bookings;
    }
}
