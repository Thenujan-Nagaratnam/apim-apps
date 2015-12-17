package org.wso2.carbon.apimgt.impl.indexing.indexer;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.solr.common.SolrException;
import org.apache.solr.common.SolrException.ErrorCode;
import org.apache.pdfbox.cos.COSDocument;
import org.apache.pdfbox.pdfparser.PDFParser;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.util.PDFTextStripper;
import org.wso2.carbon.registry.indexing.IndexingConstants;
import org.wso2.carbon.registry.indexing.AsyncIndexer.File2Index;
import org.wso2.carbon.registry.indexing.indexer.Indexer;
import org.wso2.carbon.registry.indexing.solr.IndexDocument;

public class PDFIndexer implements Indexer {
	
	public static final Log log = LogFactory.getLog(PDFIndexer.class); 

	public IndexDocument getIndexedDocument(File2Index fileData) throws SolrException {
        COSDocument cosDoc = null;
		try {
			PDFParser parser = new PDFParser(new ByteArrayInputStream(fileData.data));
			parser.parse();
			 cosDoc = parser.getDocument();

			PDFTextStripper stripper = new PDFTextStripper();
			String docText = stripper.getText(new PDDocument(cosDoc));

			IndexDocument indexDoc = new IndexDocument(fileData.path, docText, null);
			
			Map<String, List<String>> fields = new HashMap<String, List<String>>();
			
			fields.put("path", Arrays.asList(fileData.path));
			
			if (fileData.mediaType != null) {
				fields.put(IndexingConstants.FIELD_MEDIA_TYPE, Arrays.asList(fileData.mediaType));
			} else {
				fields.put(IndexingConstants.FIELD_MEDIA_TYPE, Arrays.asList("application/pdf"));
			}
			
			indexDoc.setFields(fields);
			
			return indexDoc;
		} catch (IOException e) {
			String msg = "Failed to write to the index";
			log.error(msg, e);
			throw new SolrException(ErrorCode.SERVER_ERROR, msg);
		} finally {
            if (cosDoc != null) {
                try {
                    cosDoc.close();
                } catch (IOException e) {
                   log.error("Failed to close pdf doc stream ",e);
                }
            }
        }
    }

}
