"use client";
import React, { useState, useEffect } from "react";
import Input from "@/components/shared/Input";
import {
  createSocialConfig,
  getSocialConfigById,
  updateSocialConfig,
} from "@/contentApi/socialApi";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Loading from "@/components/shared/Loading";

const MySwal = withReactContent(Swal);

const SocialForm = ({ socialId }) => {
  const router = useRouter();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    ads_name: "",
    page_id: "",
    page_access_token: "",
    webhook_verify_token: "leadmagnate_webhook",
    is_active: true,
  });

  useEffect(() => {
    if (socialId) {
      setLoading(true);
      const fetchSocialConfig = async () => {
        try {
          const config = await getSocialConfigById(socialId);
          setFormData({
            ads_name: config.ads_name || "",
            page_id: config.page_id || "",
            page_access_token: config.page_access_token || "",
            webhook_verify_token:
              config.webhook_verify_token || "leadmagnate_webhook",
            is_active: config.is_active || true,
          });
        } catch (error) {
          console.error("Error fetching social configuration:", error);
          MySwal.fire(
            "Failed!",
            "Failed to fetch social configuration details.",
            "error"
          );
          router.push("/social/list");
        } finally {
          setLoading(false);
        }
      };
      fetchSocialConfig();
    }
  }, [socialId, router]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]:
        type === "checkbox"
          ? checked
          : name === "is_active"
          ? value === "true"
          : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const socialData = {
      ads_name: formData.ads_name,
      page_id: formData.page_id,
      page_access_token: formData.page_access_token,
      webhook_verify_token: formData.webhook_verify_token,
      is_active: formData.is_active,
      organisation_id: user?.organisation_id,
    };

    try {
      if (socialId) {
        await updateSocialConfig(socialId, socialData);
        MySwal.fire(
          "Updated!",
          "The social configuration has been updated.",
          "success"
        );
      } else {
        await createSocialConfig(socialData);
        MySwal.fire(
          "Created!",
          "The social configuration has been created.",
          "success"
        );
      }
      router.push("/social/list");
    } catch (error) {
      console.error("Error:", error);
      MySwal.fire(
        "Failed!",
        `Failed to ${socialId ? "update" : "create"} the social configuration.`,
        "error"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="col-lg-12">
      <div className="card stretch stretch-full">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            {/* Facebook Section */}
            <h5 className="fw-bold mb-4">Facebook Configuration</h5>

            <div className="row g-4">
              <div className="col-md-6">
                <Input
                  label="Ads Name"
                  labelId="ads_name"
                  name="ads_name"
                  placeholder="Enter ads name"
                  value={formData.ads_name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6">
                <Input
                  label="Page ID"
                  labelId="page_id"
                  name="page_id"
                  placeholder="Enter page ID"
                  value={formData.page_id}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6">
                <Input
                  label="Page Access Token"
                  labelId="page_access_token"
                  name="page_access_token"
                  placeholder="Enter page access token"
                  value={formData.page_access_token}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Webhook Token */}
              <div className="col-md-6">
                <Input
                  label="Webhook Verify Token"
                  labelId="webhook_verify_token"
                  name="webhook_verify_token"
                  placeholder="leadmagnate_webhook"
                  value={formData.webhook_verify_token}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Status */}
              <div className="col-md-6">
                <div className="row mb-4 align-items-center">
                  <div className="col-lg-4">
                    <label className="fw-semibold">Status:</label>
                  </div>
                  <div className="col-lg-8">
                    <select
                      name="is_active"
                      value={formData.is_active ? "true" : "false"}
                      onChange={handleChange}
                      className="form-select"
                    >
                      <option value="true">Active</option>
                      <option value="false">Inactive</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <div className="d-flex justify-content-end mt-4">
              <button
                type="submit"
                className="btn btn-primary px-4"
                disabled={isSubmitting}
              >
                {isSubmitting
                  ? "Processing..."
                  : socialId
                  ? "UPDATE CONFIGURATION"
                  : "CREATE CONFIGURATION"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SocialForm;
