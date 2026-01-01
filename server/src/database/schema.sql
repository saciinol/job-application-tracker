-- ============================================
-- JOB APPLICATION TRACKER DATABASE SCHEMA
-- ============================================

-- Drop tables if they exist (for clean re-runs)

-- ============================================
-- USERS TABLE
-- ============================================
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- JOB APPLICATIONS TABLE
-- ============================================
CREATE TABLE applications (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  company_name VARCHAR(255) NOT NULL,
  position VARCHAR(255) NOT NULL,
  status VARCHAR(50) DEFAULT 'Applied',
  location VARCHAR(255),
  salary_range VARCHAR(100),
  job_url TEXT,
  notes TEXT,
  applied_date DATE NOT NULL,
  deadline DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- ============================================
-- INDEXES
-- ============================================
CREATE INDEX idx_applications_user_created_at ON applications (user_id, created_at DESC);
CREATE INDEX idx_applications_user_status_created_at ON applications (user_id, status, created_at DESC);

CREATE EXTENSION IF NOT EXISTS pg_trgm;
CREATE INDEX id_applications_search_trgm ON applications USING GIN ((company_name || ' ' || position) gin_trgm_ops);