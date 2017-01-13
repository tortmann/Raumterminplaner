package at.fh.ima.swengs.raumterminplaner.model;

import at.fh.ima.swengs.raumterminplaner.util.JsonDateDeserializer;
import at.fh.ima.swengs.raumterminplaner.util.JsonDateSerializer;
import com.fasterxml.jackson.annotation.*;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

import javax.persistence.*;
import java.util.Date;
import java.util.List;
import java.util.Set;


@Entity
public class Mitarbeiter {


    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    private String name;

    private String vorname;



    @OneToMany(mappedBy = "mitarbeiter",orphanRemoval = true)
    private List<Termin> termine;





    public Mitarbeiter() {
    }

    public Mitarbeiter(String name, String vorname) {
        this.name = name;
        this.vorname = vorname;

    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getVorname() {
        return vorname;
    }

    public void setVorname(String vorname) {
        this.vorname = vorname;
    }

}
