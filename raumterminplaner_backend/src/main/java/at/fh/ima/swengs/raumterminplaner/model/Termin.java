package at.fh.ima.swengs.raumterminplaner.model;

import at.fh.ima.swengs.raumterminplaner.util.JsonDateDeserializer;
import at.fh.ima.swengs.raumterminplaner.util.JsonDateSerializer;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

import javax.persistence.*;
import java.util.Date;
import java.util.List;
import java.util.Set;


@Entity
//@JsonIdentityInfo(generator=ObjectIdGenerators.PropertyGenerator.class, property="id")

public class Termin {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @JsonDeserialize(using = JsonDateDeserializer.class)
    @JsonSerialize(using = JsonDateSerializer.class)

    //@JsonFormat(shape = JsonFormat.Shape.STRING,pattern="dd.MM.yyyy")
    @Temporal(TemporalType.DATE)
    private Date datum;

    private String kommentar;

    @ManyToOne
    private Raum raum;

    @ManyToOne
    private Mitarbeiter mitarbeiter;

    public Termin() {

    }

    public Termin(Date datum, String kommentar) {
        this.datum = datum;
        this.kommentar = kommentar;

    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Date getDatum() {
        return datum;
    }

    public void setDatum(Date datum) {
        this.datum = datum;
    }

    public String getKommentar() {
        return kommentar;
    }

    public void setKommentar(String kommentar) {
        this.kommentar = kommentar;
    }

    public Raum getRaum() {
        return raum;
    }

    public void setRaum(Raum raum) {
        this.raum = raum;
    }

    public Mitarbeiter getMitarbeiter() {
        return mitarbeiter;
    }

    public void setMitarbeiter(Mitarbeiter mitarbeiter) {
        this.mitarbeiter = mitarbeiter;
    }
}
