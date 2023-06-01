package br.spin.crud.atendimentos.controller;

import br.spin.crud.atendimentos.models.*;
import br.spin.crud.atendimentos.models.InterfacesJPA.*;
import br.spin.crud.atendimentos.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("atendimentos")
public class AtendimentoController {

    @Autowired
    private AtendimentoRepository atendimentoRepository;
    @Autowired
    private AtendPersonalizadoRepository atendPersonalizadoRepository;

    @PersistenceContext
    private EntityManager manager;

    @GetMapping("/lista")
    public List<Atendimento> listaAtendimentos() {
        if (atendimentoRepository != null) {
            return atendimentoRepository.findAll();
        } else {
            return null;
        }
    }

    @GetMapping("/listaPersonalizada/view") //método utilizando view criada no banco
    public List<AtendimentoPersonalizado> atendimentos() {
        if (atendPersonalizadoRepository != null) {
            return atendPersonalizadoRepository.findAll();
        } else {
            return null;
        }
    }

    @GetMapping("/listaAtendimentosPaciente")
    public List<AtendimentosPaci> atendimentos4(
            @RequestParam(name = "id") Integer id,
            @RequestParam(name = "idDois", required = false) Integer idDois,
            @RequestParam(name = "idTres", required = false) Integer idTres
    ) {
        List<AtendimentosPaciente> listaAtendimentos = atendimentoRepository.atendimentosPacinte(id, idDois, idTres);
        List<AtendimentosPaci> resposta = new ArrayList<>();
        for (InterfacesJPA.AtendimentosPaciente linha : listaAtendimentos) {
            AtendimentosPaci objeto = new AtendimentosPaci();
            objeto.setIdAtendimento(linha.getId_atendimento());
            objeto.setDtAtendimento(linha.getDt_atendimento());
            objeto.setNomeUnidade(linha.getNome_unidade());
            resposta.add(objeto);
        }
        return resposta;
    }

    @GetMapping("/listaAtendimentosData")
    public List<AtendimentoPersonalizado> atendimentos5(@RequestParam(name = "data") LocalDate data) {
        List<RetornoAtendimentoSQLNativo> listaAtendimentos = atendimentoRepository.atendimentosData(data);
        List<AtendimentoPersonalizado> resposta = new ArrayList<>();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
        for (RetornoAtendimentoSQLNativo linha : listaAtendimentos) {
            AtendimentoPersonalizado objeto = new AtendimentoPersonalizado();
            objeto.setId(linha.getId());
            objeto.setDtAtendimento(linha.getDt_atendimento());
            objeto.setNomePaciente(linha.getNome_paciente());
            objeto.setDtNascimento(linha.getDt_nascimento());
            objeto.setNomeUnidade(linha.getNome_unidade());
            resposta.add(objeto);
        }
        return resposta;
    }

    @PostMapping("/cadastro")
    private Atendimento salvarAtendimento(@RequestBody Atendimento atendimento) {
        if (atendimento.getDt_atendimento() == null) {
            atendimento.setDt_atendimento(LocalDate.now());
        }
        return atendimentoRepository.save(atendimento);
    }

    @DeleteMapping("/excluir/{id}")
    private void excluirAtendimento(@PathVariable(name = "id") Integer id) {
        atendimentoRepository.deleteById(id);
    }

}
