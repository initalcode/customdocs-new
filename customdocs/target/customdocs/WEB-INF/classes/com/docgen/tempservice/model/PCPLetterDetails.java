package com.docgen.tempservice.model;

import java.util.Date;




import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class PCPLetterDetails {

	@Column(name = "pcpId", columnDefinition = "serial")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Id
	private long pcpId;
	private String dosNotPaid;
	private Date startDate;
	private Double amountDue;
	private long patientId;
	private long facilityId;
	private long doctorId;
	private Date dateCreated;
	
	public long getPcpId() {
		return pcpId;
	}
	public void setPcpId(long pcpId) {
		this.pcpId = pcpId;
	}
	public String getDosNotPaid() {
		return dosNotPaid;
	}
	public void setDosNotPaid(String dosNotPaid) {
		this.dosNotPaid = dosNotPaid;
	}
	public Date getStartDate() {
		return startDate;
	}
	public void setStartDate(Date startDate) {
		this.startDate = startDate;
	}
	public Double getAmountDue() {
		return amountDue;
	}
	public void setAmountDue(Double amountDue) {
		this.amountDue = amountDue;
	}
	public long getPatientId() {
		return patientId;
	}
	public void setPatientId(long patientId) {
		this.patientId = patientId;
	}
	public long getFacilityId() {
		return facilityId;
	}
	public void setFacilityId(long facilityId) {
		this.facilityId = facilityId;
	}
	public long getDoctorId() {
		return doctorId;
	}
	public void setDoctorId(long doctorId) {
		this.doctorId = doctorId;
	}
	public Date getDateCreated() {
		return dateCreated;
	}
	public void setDateCreated(Date dateCreated) {
		this.dateCreated = dateCreated;
	}
	public PCPLetterDetails(long pcpId, String dosNotPaid, Date startDate,
			Double amountDue, long patientId, long facilityId, long doctorId,
			Date dateCreated) {
		super();
		this.pcpId = pcpId;
		this.dosNotPaid = dosNotPaid;
		this.startDate = startDate;
		this.amountDue = amountDue;
		this.patientId = patientId;
		this.facilityId = facilityId;
		this.doctorId = doctorId;
		this.dateCreated = dateCreated;
	}
	public PCPLetterDetails() {
	}
	
	
}
