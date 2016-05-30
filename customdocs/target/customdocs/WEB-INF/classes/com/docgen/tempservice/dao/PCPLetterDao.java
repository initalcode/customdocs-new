package com.docgen.tempservice.dao;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.support.JdbcDaoSupport;
import org.springframework.stereotype.Component;

import com.docgen.tempservice.model.PCPLetterDetails;


public class PCPLetterDao extends JdbcDaoSupport{

	public void savePCPDetails(PCPLetterDetails pcp) {
		String sql = "insert into pcpletterdetails (patientid, doctorid, facilityid, amountdue, dosnotpaid, startdate, datecreated) values (?,?,?,?,?,?,?)";
		this.getJdbcTemplate().update(sql, new Object[]{pcp.getPatientId(), pcp.getDoctorId(), pcp.getFacilityId(), pcp.getAmountDue(),
				pcp.getDosNotPaid(), pcp.getStartDate(), pcp.getDateCreated()});
	}
	public List<PCPLetterDetails> getPCPLetters() {
		String sql = "select * from pcpletterdetails";
		return this.getJdbcTemplate().query(sql, new PCPMapper());
	}
	public PCPLetterDetails getPCPLetter(long pcpid) {
		String sql = "select * from pcpletterdetails where pcpid = ?";
		return this.getJdbcTemplate().queryForObject(sql, new Object[]{pcpid}, new PCPMapper());
	}
	public void removePCPLetter(long pcpId) {
		String sql = "delete from pcpletterdetails where pcpId = ?";
		this.getJdbcTemplate().update(sql, new Object[]{pcpId});
	}
	private final static class PCPMapper implements RowMapper<PCPLetterDetails> {

		public PCPLetterDetails mapRow(ResultSet rs, int rowNum) throws SQLException {
			PCPLetterDetails pcp = new PCPLetterDetails();
			pcp.setPatientId(rs.getLong("patientId"));
			pcp.setDoctorId(rs.getLong("doctorId"));
			pcp.setFacilityId(rs.getLong("facilityId"));
			pcp.setAmountDue(rs.getDouble("amountDue"));
			pcp.setDosNotPaid(rs.getString("dosNotPaid"));
			pcp.setStartDate(rs.getDate("startDate"));
			pcp.setDateCreated(rs.getDate("dateCreated"));
			pcp.setPcpId(rs.getLong("pcpId"));
	
			return pcp;
		}}
}
