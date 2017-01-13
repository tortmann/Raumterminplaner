package at.fh.ima.swengs.raumterminplaner.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.util.List;


@Entity

public class Raum {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    private String bezeichnung;


    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getBezeichnung() {return bezeichnung;    }

    public void setBezeichnung(String bezeichnung) {this.bezeichnung = bezeichnung;}


    @OneToMany(mappedBy = "raum",orphanRemoval = true)
    private List<Termin> termine;

}
