package com.wecp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.wecp.dto.PersonSalesDto;
import com.wecp.entities.PersonTransaction;
import com.wecp.repos.PersonTxnRepository;
import com.wecp.services.PersonTxnService;

@RestController
public class PersonTxnController {
	@Autowired
	PersonTxnService personTxnService;
	
	@Autowired
	PersonTxnRepository personTxnRepository;
	
	//@RequestMapping(value = "/addOrUpdate", method = RequestMethod.POST)
	@PostMapping("/addOrUpdate")
	public ResponseEntity<?> addOrUpdate(@RequestBody PersonTransaction personTransaction)
			throws Exception {

		personTxnService.saveOrUpdate(personTransaction);
		return ResponseEntity.ok("success");
	}
	
	/*@todo: map a post endpoint to /delete */
	@PostMapping("/delete")
	public ResponseEntity<?> delete(@RequestParam("id") Long id){
		/**
		 * @todo Perform mandatory validations on the incoming id attribute. Check if it is valid as in the record exists in database with that id.
		 * If the id doesn't exist in database, return 'INVALID_ID_PASSED' as a String response
		 */
		if(id==null || !personTxnRepository.existsById(id)){
			return ResponseEntity.ok("INVALID_ID_PASSED");
		}


		//personTxnService.delete(id);
		//return ResponseEntity.ok("success");
		personTxnService.delete(id);
		return ResponseEntity.ok("success");
	}
	
	//@todo: map a get endpoint to /fetchAllPersonTransactions 
	
	@GetMapping("/fetchAllPersonTransactions")
	public ResponseEntity<?> fetchAllPersonTransactions()
			throws Exception {

		
		/**
		 * @todo Fetch all the PersonTransaction records and return them in ResponseEntity
		 */
		List<PersonTransaction> transactions=personTxnService.fetchAll();

		return ResponseEntity.ok(transactions);
	}
	
	// @todo: map a get endpoint to /calculateTotalSales 
	@GetMapping("/calculateTotalSales")
	public ResponseEntity<?> calculateTotalSales()
			throws Exception {
		
		/**
		 * @todo Call the appropriate method on personTxnService to populate the amt variable
		 */
		Double amt = personTxnService.calculateTotalSales();
		return ResponseEntity.ok(amt);
		
	}
	
// @todo: map a get endpoint to /calculateTotalCreditCardSales
	@GetMapping("/calculateTotalCreditCardSales")
	public ResponseEntity<?> calculateTotalCreditCardSales()
			throws Exception {

	Double amt=personTxnService.calculateTotalCreditCardSales();
	return ResponseEntity.ok(amt);
	
	}
	
// @todo: map a get endpoint to /calculateTotalCashSales
	@GetMapping("/calculateTotalCashSales")
	public ResponseEntity<?> calculateTotalCashSales()
			throws Exception {

			Double amt=personTxnService.calculateTotalCashSales();
			return ResponseEntity.ok(amt);
	}
	// @todo: map a get endpoint to /fetchPersonWithMostSales
	@GetMapping("/fetchPersonWithMostSales")
	public ResponseEntity<?> fetchPersonWithMostSales()
			throws Exception {
				PersonSalesDto list=personTxnService.fetchPersonWithMostSales();
				return ResponseEntity.ok(list);
	
	}

}
