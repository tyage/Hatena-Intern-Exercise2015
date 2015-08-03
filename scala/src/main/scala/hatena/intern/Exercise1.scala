package hatena.intern

import java.util.Date
import org.joda.time.DateTime
import org.joda.time.DateTimeZone

case class Log(host: String, user: Option[String], epoch: Int, req: String, status: Int, size: Int, referer: Option[String]) {
  private val Array(reqMethod, reqPath, reqProtocol) = this.req.split(" ")

  def method: String = reqMethod
  def path: String = reqPath
  def protocol: String = reqProtocol
  def uri: String = s"http://${host}${path}"
  def time: String = new DateTime(new Date(epoch.toLong * 1000))
    .withZone(DateTimeZone.UTC)
    .toString("YYYY-MM-dd'T'HH:mm:ss")
}
